"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListController = void 0;
const common_1 = require("@nestjs/common");
const my_list_service_1 = require("./my-list.service");
let MyListController = class MyListController {
    service;
    constructor(service) {
        this.service = service;
    }
    add(body) {
        console.log('BODY:', body);
        return this.service.add(body.userId, body.movieId);
    }
    remove(body) {
        return this.service.remove(body.userId, body.movieId);
    }
    get(userId) {
        return this.service.get(userId);
    }
    test() {
        return this.service.get('test-user');
    }
};
exports.MyListController = MyListController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyListController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyListController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MyListController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyListController.prototype, "test", null);
exports.MyListController = MyListController = __decorate([
    (0, common_1.Controller)('my-list'),
    __metadata("design:paramtypes", [my_list_service_1.MyListService])
], MyListController);
//# sourceMappingURL=my-list.controller.js.map