import { Component, Input, ViewChild, ElementRef } from '@angular/core';


declare global {
    namespace THREE {
        class STLLoader {
            load(filename: string, callback: Function): Promise<any>;
        }
        class Renderer {
            setClearColor;
        }
    }
}

let loadStl = (filename: string): Promise<THREE.Geometry> => {
    return new Promise((resolve, reject) => {
        let loader = new THREE.STLLoader();
        try {
            loader.load(filename, (geometry: THREE.Geometry) => {
                resolve(geometry)
            })
        } catch (e) {
            reject(e);
        }
    });
};

@Component({
    selector: 'chair-disp',
    templateUrl: './chair-disp.component.html'
})
export class ChairDispComponent {
    @Input() colors: string[];

    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    geometry: THREE.Geometry;
    material: THREE.Material;
    cube: THREE.Mesh;
    loader: any;
    ch88: THREE.Mesh;
    controls: THREE.OrbitControls;

    meshes: any[] = [];

    @Input() width: number = 512;
    @Input() height: number = 512;

    @ViewChild('viewer') viewer: ElementRef;

    constructor() {}

    ngAfterViewInit() {}

    ngOnInit() {
        this.createRenderer();
        this.createScene();
        this.load();
        this.render();
    }

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(
            this.viewer.nativeElement.clientWidth,
            this.viewer.nativeElement.clientHeight);
        this.renderer.setClearColor( 0x000000, 0 );
        this.viewer.nativeElement.appendChild(this.renderer.domElement);
    }

    private createScene() {
        this.scene = new THREE.Scene();
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh(geometry, material);

        // this.camera = new THREE.PerspectiveCamera( 100, 512/512, 0.1, 1000 );
        // this.camera.position.z = 40;

        this.camera = new THREE.OrthographicCamera(
            this.width / - 20, this.width / 20,
            this.height / 20, this.height / - 20,
            - 500, 1000
        );
        this.camera.position.x = 0;
		this.camera.position.y = 0;
        this.camera.position.z = 10;


        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    private load() {

        let back_lean = loadStl('assets/stl/ch88_back_lean.stl');
        let legs = loadStl('assets/stl/ch88_legs.stl');
        let rubber = loadStl('assets/stl/ch88_rubbers.stl');
        let seat = loadStl('assets/stl/ch88_seat.stl');

        Promise.all([back_lean, legs, rubber, seat])
            .then((values) => {
                for (let geometry of values) {
                    let color = 0x000000;
                    let material = new THREE.MeshBasicMaterial( { color: color } );
                    let mesh = new THREE.Mesh(geometry, material);
                    this.meshes.push(mesh);
                    this.scene.add(mesh);
                }
            });
    }

    public render() {
        if (this.meshes.length > 0 && this.meshes[0] !== undefined) {
            // BackLean
            let hex: number = parseInt(this.colors[0].replace(/^#/, ''), 16);
            this.meshes[0].material.color.setHex(hex);
        }

        if (this.meshes.length > 1 && this.meshes[1] !== undefined) {
            // Legs
            let hex: number = parseInt(this.colors[1].replace(/^#/, ''), 16);
            this.meshes[1].material.color.setHex(hex);
        }

        if (this.meshes.length > 2 && this.meshes[2] !== undefined) {
            // Rubbers
            let hex: number = parseInt(this.colors[1].replace(/^#/, ''), 16);
            this.meshes[2].material.color.setHex(hex);
        }

        if (this.meshes.length > 3 && this.meshes[3] !== undefined) {
            // Seat
            let hex: number = parseInt(this.colors[2].replace(/^#/, ''), 16);
            this.meshes[3].material.color.setHex(hex);
        }



        requestAnimationFrame(this.render.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}