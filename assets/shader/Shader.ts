import { _decorator, Component, director, ForwardPipeline, Node } from 'cc';
import { NATIVE } from 'cc/env';

let uboBuffer: Float32Array = null;

const GLOBAL_UBO_OFFSET = 20;

export class Shader {
    static setGlobal(index: 0 | 1 | 2 | 3, x = 0, y = 0, z = 0, w = 0) {
        if (!NATIVE) {
            if(!uboBuffer) {
                uboBuffer = (director.root.pipeline as ForwardPipeline).pipelineUBO['_globalUBO'];
            }
            let offset = GLOBAL_UBO_OFFSET + index * 4;
            uboBuffer[offset] = x;
            uboBuffer[offset + 1] = y;
            uboBuffer[offset + 2] = z;
            uboBuffer[offset + 3] = w;
        } else {
            console.log(director.root.pipeline)
        }
    }
}