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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const videos_service_1 = require("./videos.service");
const create_video_dto_1 = require("./dto/create-video.dto");
const common_2 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_2 = require("path");
let VideosController = class VideosController {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    createVideo(body) {
        return this.videosService.createVideo(body);
    }
    async uploadVideo(file) {
        const inputPath = file.path;
        const videoId = file.filename.split('.')[0];
        const outputDir = (0, path_1.join)('streams', videoId);
        if (!(0, fs_1.existsSync)(outputDir)) {
            (0, fs_1.mkdirSync)(outputDir, { recursive: true });
        }
        const outputPath = (0, path_1.join)(outputDir, 'playlist.m3u8');
        await new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(inputPath)
                .outputOptions([
                '-profile:v baseline',
                '-level 3.0',
                '-start_number 0',
                '-hls_time 10',
                '-hls_list_size 0',
                '-f hls',
            ])
                .output(outputPath)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });
        return {
            streamUrl: `/streams/${videoId}/playlist.m3u8`,
        };
    }
    getVideos(page = 1, limit = 10) {
        return this.videosService.getVideos(Number(page), Number(limit));
    }
    getVideo(id) {
        return this.videosService.getVideoById(id);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_2.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_dto_1.CreateVideoDto]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "createVideo", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_2.extname)(file.originalname);
                callback(null, `video-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getVideos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getVideo", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map