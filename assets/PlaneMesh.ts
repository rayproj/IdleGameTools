import { _decorator, Component, MeshRenderer, Node, primitives, Rect, utils } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('PlaneMesh')
@executeInEditMode(true)
export class PlaneMesh extends Component {
    @property(Rect)
    rect: Rect = new Rect(10, 10, 100, 100);

    start() {
        const renderer = this.node.getComponent(MeshRenderer);
        const rect = this.rect;
        const plane = primitives.plane({
            width: rect.x,
            length: rect.y,
            widthSegments: rect.width,
            lengthSegments: rect.height
        });
        renderer.mesh = utils.createMesh(plane);
    }
}


