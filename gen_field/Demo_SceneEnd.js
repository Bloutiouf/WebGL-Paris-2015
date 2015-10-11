//==========================================================
//
//	�V�[��End
//
//==========================================================
function CreateSceneEnd()
{

	var scene = new THREE.Scene();
 
    // �J�����̍쐬
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
    camera.position = new THREE.Vector3(0, 8, 12);
    camera.lookAt(new THREE.Vector3(-1, 0, 4));
    scene.add(camera);




    // (2) �}�e���A���̍쐬
    var material = new THREE.ShaderMaterial({
    	vertexShader: document.getElementById('SceneEnd_VS').textContent,
        fragmentShader: document.getElementById('SceneEnd_FS').textContent,
		//uniform:�V�F�[�_�[�̑S�̂̐ݒ�
        uniforms: {
          time: { type: 'f', value: 0 },
          resolution: { type: 'v2', value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
        },
 
        // �ʏ�}�e���A���̃p�����[�^
        blending: THREE.AdditiveBlending, transparent: false, depthTest: false
	});


	
	// (3) �`��f�[�^���쐬�i�����ɒǉ��̒��_�����������j
    
	var geometry   = new THREE.Geometry();
    var attributes = material.attributes;
 
    geometry.vertices.push( new THREE.Vector3(  1 ,  1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3(  1 , -1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1 ,  1 , 0.5 ) );
    geometry.vertices.push( new THREE.Vector3( -1 , -1 , 0.5 ) );

	geometry.faces.push( new THREE.Face3(0, 2, 1 ) );
	geometry.faces.push( new THREE.Face3(1, 2, 3 ) );

    var mesh = new THREE.Mesh( geometry, material );

	//attribute:�꒸�_������̏��
 
      // ���̂��쐬
      scene.add(mesh);

      return { scene: scene , camera: camera , material: material , duration: 10};


}

