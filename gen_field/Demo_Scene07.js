//==========================================================
//
//	�V�[��07
//
//==========================================================
var gScene07Primitive;
var gScene07RenderTarget;
var gScene07Composer;
var gScene07Object;



var gScene07RTTCamera;
var gScene07RTTScene;
var gScene07RTTObject;

//---- Renderer���K�v�ȏ����� ----
function EnterScene07( renderer , scene , camera )
{
}

//---- �v�Z ---
function CalcScene07( scene , camera , time )
{
	var rad = 2.5*time;

	for( var j=0 ; j < 10 ; j++ )
	{
		for( var i=0 ; i < 10 ; i++ )
		{
			gScene07Object[j][i].rotation.set( 0.2  , rad+0.5*i , 0 );
		}
	}
}

//---- �����_�����O ----
function RenderScene07( renderer , scene , camera , time )
{
	// target
	renderer.clearTarget( gScene07RenderTarget, 0, 0, 0 );
	renderer.render( gScene07RTTScene, gScene07RTTCamera , gScene07RenderTarget );

	// main
    //renderer.setClearColor(0x000000);
	renderer.render( scene, camera );

	//renderer.render( gScene07RTTScene, gScene07RTTCamera );
}

//----- ���T�C�Y ---
function OnResizeScene07()
{
}


function CreateScene07()
{
	// �����_�����O�^�[�Q�b�g�̍쐬
	gScene07RenderTarget = new THREE.WebGLRenderTarget(  window.innerWidth,window.innerHeight , { format: THREE.RGBAFormat } );

	//========== ���C���V�[�� ==========
	var scene = new THREE.Scene();

	// �J�����̍쐬
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1,1000);
    camera.position.set( 0, 0, 10 );

	// ��
	var geometry = new THREE.SphereGeometry(0.5,64,32); 
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map:gScene07RenderTarget }); // Skin the cube with 100% blue.
	gScene07Object = new Array();
	for( var j=0 ; j < 10 ; j++ )
	{
		gScene07Object[j] = new Array();
		for( var i=0 ; i < 10 ; i++ )
		{
			var cube = new THREE.Mesh(geometry, material); // Create a mesh based on the specified geometry (cube) and material (blue skin).
			
			cube.position.x = ( i - ( 10 - 1 ) / 2 )*2;
			cube.position.y = ( j - ( 10 - 1 ) / 2 )*1;
			cube.position.z = 0;
			cube.rotation.y = 3.1418 * -0.3;

			scene.add(cube); 
			gScene07Object[j][i] = cube;
		}
	}


	//========== RenderToTexture�V�[�� =====
	gScene07RTTScene = new THREE.Scene();
	gScene07RTTCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0 , 1000 );
	gScene07RTTCamera.position.set( 0, 0, 5 );

   
    // (2) �}�e���A���̍쐬
    var material = new THREE.ShaderMaterial({
    	vertexShader: document.getElementById('Scene07_VS').textContent,
        fragmentShader: document.getElementById('Scene07_FS').textContent,
		//uniform:�V�F�[�_�[�̑S�̂̐ݒ�
        uniforms: {
          time: { type: 'f', value: 0 },
          resolution: { type: 'v2', value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
        },
 
        // �ʏ�}�e���A���̃p�����[�^
        blending: THREE.AdditiveBlending, transparent: false, depthTest: false
	});

	/*
	var geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0); // Create a 20 by 20 by 20 cube.
//	var material = new THREE.MeshBasicMaterial({ color: 0xFF00FF }); // Skin the cube with 100% blue.
	var cube = new THREE.Mesh(geometry, material); // Create a mesh based on the specified geometry (cube) and material (blue skin).
	cube.position.set(0.0, 0.0, 0.0); 
	gScene07RTTScene.add(cube); // Add the cube at (0, 0, 0).
	*/

	// �l�p�`   
	var geometry   = new THREE.Geometry();
    var attributes = material.attributes;
    geometry.vertices.push( new THREE.Vector3(  1 ,  1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3(  1 , -1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1 ,  1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1 , -1 , 0.5 ) );

	geometry.faces.push( new THREE.Face3(0, 2, 1 ) );
	geometry.faces.push( new THREE.Face3(1, 2, 3 ) );
	var mesh = new THREE.Mesh( geometry, material );
	gScene07RTTScene.add(mesh);
	gScene07RTTObject = mesh;

	
	



    return { scene: scene , 
			 camera: camera , 
			 material: material , 
			 duration: 4 , 
			 enter:EnterScene07 ,
			 calc:CalcScene07 , 
			 render:RenderScene07 ,
			 resize:OnResizeScene07 };


}

