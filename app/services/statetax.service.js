"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../environments/environment");
var StateTaxService = /** @class */ (function () {
    function StateTaxService(http) {
        this.http = http;
        this.apiUri = environment_1.environment.APIbaseUrl;
    }
    StateTaxService.prototype.loadStateTaxes = function () {
        return this.http
            .get(this.apiUri + "statetax/all")
            .toPromise()
            .then(function (result) { return result; });
    };
    return StateTaxService;
}());
exports.StateTaxService = StateTaxService;
//# sourceMappingURL=statetax.service.js.map