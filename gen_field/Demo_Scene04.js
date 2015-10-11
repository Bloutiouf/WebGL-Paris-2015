//==========================================================
//
//	�V�[��04  tunnel
//
//==========================================================
var gScene04Primitive;
var gScene04RenderTarget;
var gScene04Composer;
var EffectDurationTime;
//---- Renderer���K�v�ȏ����� ----
function EnterScene04( renderer , scene , camera )
{
	EffectDurationTime = 0;
	// �|�X�g�G�t�F�N�g
	// Composer������ăp�X��˂�����ł����B
	gScene04Composer = new THREE.EffectComposer( renderer );

	// �y�P�i�ځz�V�[���̃����_�����O
	var effect = new THREE.RenderPass( scene, camera );
	gScene04Composer.addPass( effect );

	//var effect = new THREE.BloomPass( 1.25);
	//gScene04Composer.addPass( effect );

	// �y�Q�i�ځz�h�b�g�V�F�[�_�[
	var effect = new THREE.ShaderPass( THREE.DotScreenShader );
	effect.uniforms[ 'scale' ].value = 4;
	gScene04Composer.addPass( effect );

	// �y�R�i�ځzRGB�V�t�g
	var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
	effect.uniforms[ 'amount' ].value = 0.0055;

	effect.renderToScreen = true;		// ���Ō�̃p�X�ɂ�����Effect�͕K��true��

	gScene04Composer.addPass( effect );

}

//---- �v�Z ---
function CalcScene04( scene , camera , time )
{
	// ���̗p��Create�ō�����W�I���g���𓮂������Ƃ��o����
	gScene04Primitive.geometry.verticesNeedUpdate = true;
	gScene04Primitive.geometry.vertices[0].x = time;
}

//---- �����_�����O ----
function RenderScene04( renderer , scene , camera , time )
{
	if(time>5.0 && time < 8.0 || time > 11.0 && time< 14.0 ||time > 17.0 && time< 19.0  ||time > 21.0 && time< 22.0)
	{
		// �����_�����O�̓R���|�[�U�[�̃����_�����O���Ăяo������
		gScene04Composer.render();
	}
	else
	{	
		// �R���|�[�U�[���g��Ȃ��Ȃ�A���ڃ����_�����O�֐����Ăяo��
		renderer.render( scene, camera);
	}
}


function CreateScene04()
{

	var scene = new THREE.Scene();
 
	// �����_�����O�^�[�Q�b�g�̍쐬
	gScene04RenderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight , { format: THREE.RGBAFormat } );

    // �J�����̍쐬
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
    camera.position = new THREE.Vector3(0, 8, 12);
    camera.lookAt(new THREE.Vector3(-1, 0, 4));
    scene.add(camera);


    // (2) �}�e���A���̍쐬
    var material = new THREE.ShaderMaterial({
    	vertexShader: document.getElementById('Scene04_VS').textContent,
        fragmentShader: document.getElementById('Scene04_FS').textContent,
		//uniform:�V�F�[�_�[�̑S�̂̐ݒ�
        uniforms: {
          time: { type: 'f', value: 0 },
          resolution: { type: 'v2', value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
        },
 
        // �ʏ�}�e���A���̃p�����[�^
        blending: THREE.AdditiveBlending, transparent: false, depthTest: false
	});


	
	// (3) �`��f�[�^���쐬�i�����ɒǉ��̒��_�����������j
 
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
	scene.add(mesh);


	// ���C��
	var geometry = new THREE.Geometry();
	for( var i=0 ; i < 1000 ; i++ )
	{
		geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	}
	geometry.verticesNeedUpdate = true;
	geometry.dynamic = true;
	var line = new THREE.Line(geometry, material);
	scene.add(line);

	gScene04Primitive = line;

	//attribute:�꒸�_������̏��
 
      // ���̂��쐬
      

    return { scene: scene , 
			 camera: camera , 
			 material: material , 
			 duration: 30 , 
			 enter:EnterScene04 ,
			 calc:CalcScene04 , 
			 render:RenderScene04 };


}

