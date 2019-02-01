import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import {
    HttpClient,
    HttpHandler, HttpEvent, HttpInterceptor,
    HttpRequest, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
    currentRequest: HttpRequest<any>;
    auth: AuthService;

    constructor(
        private injector: Injector,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        this.auth = this.injector.get(AuthService);
        var token = (this.auth.isLoggedIn()) ? this.auth.getAuth()!.token : null;

        console.log("at intercept response");
        if (token) {
            // save current request
            this.currentRequest = request;

            return next.handle(request)
                .do((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do nothing
                    }
                })
                .catch(error => {
                    return this.handleError(error, next)
                });
        }
        else {
          console.log("is this the login page?");
          if (request.url.substr(request.url.lastIndexOf('/')+1) === 'login') {
            console.log("yes keep it moving");
            return next.handle(request);
          }
          this.router.navigate(['\login']);
          //return next.handle(request);
        }
    }

    handleError(err: any, next: HttpHandler) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                // JWT token might be expired:
                // try to get a new one using refresh token
                console.log("Token expired. Attempting refresh...");

                //  ===[2018.01.05 FIX - BOOK UPDATE]===
                // cfr. https://github.com/PacktPublishing/ASP.NET-Core-2-and-Angular-5/issues/8
                // and  https://github.com/PacktPublishing/ASP.NET-Core-2-and-Angular-5/issues/15
                // store current request into a local variable
                var previousRequest = this.currentRequest;

              //if (this.auth.getAuth()!.refresh_token != null) {
                // thanks to @mattjones61 for the following code
                return this.auth.refreshToken()
                  .flatMap((refreshed) => {
                    var token = (this.auth.isLoggedIn()) ? this.auth.getAuth()!.token : null;
                    if (token) {
                      previousRequest = previousRequest.clone({
                        setHeaders: { Authorization: `Bearer ${token}` }
                      });
                      console.log("header token reset");
                    }
                    return next.handle(previousRequest);
                  });
              //}
              //else {
              //  console.log("redirecting to login");
              //  this.router.navigate(['\login']); 
              //}
                
            }
        }
        return Observable.throw(err);
    }
}
