import { _decorator, Camera, Color, Component, director, gfx, Layers, Node, RenderTexture } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('DepthCamera')
// @executeInEditMode(true)
export class DepthCamera extends Component {
    @property(RenderTexture)
    depthTexture: RenderTexture = null;

    onLoad() {
        this.createDepthCamera();
    }

    private createDepthCamera() {
        const depthCameraNode = new Node('DepthCamera');
        this.node.addChild(depthCameraNode);
        const mainCamera = this.getComponent(Camera);
        const depthCamera = depthCameraNode.addComponent(Camera);

        // set
        depthCamera.priority = mainCamera.priority - 1;
        depthCamera.visibility = Layers.Enum['Depth'];
        depthCamera.clearFlags = gfx.ClearFlagBit.ALL;

        const depthTexture = this.depthTexture;
        const mCamera = mainCamera.camera;
        const scale = 1;
        // depthTexture.reset({ width: mCamera.width * scale, height: mCamera.height * scale });
        depthTexture.resize(mCamera.width * scale, mCamera.height * scale);
        depthCamera.targetTexture = depthTexture;

        depthCamera.clearColor = Color.WHITE;
        depthCamera.clearDepth = mainCamera.clearDepth;
        depthCamera.clearStencil = mainCamera.clearStencil;
        depthCamera.projection = mainCamera.projection;
        depthCamera.fovAxis = mainCamera.fovAxis;
        depthCamera.fov = mainCamera.fov;
        depthCamera.near = mainCamera.near;
        depthCamera.far = mainCamera.far;
        depthCamera.aperture = mainCamera.aperture;
        depthCamera.shutter = mainCamera.shutter;
        depthCamera.iso = mainCamera.iso;
        depthCamera.rect = mainCamera.rect;
    }
}


