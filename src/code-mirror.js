define(function(require){
  return {

    load: function (name, req, onload, config) {

 	  /**
       * Check all needed config keys
       */
      if (!config.hasOwnProperty('cm')
          && config['cm'].hasOwnProperty('baseUrl')
          && config['cm'].hasOwnProperty('path')
          && config['cm'].hasOwnProperty('css')
          && config['cm'].hasOwnProperty('modes')
          && config['cm'].hasOwnProperty('theme')
          && config['cm']['modes'].hasOwnProperty('path')){

        throw new Error('cm, cm.baseUrl, cm.path, cm.css, cm.theme, cm.modes.path should be defined at requirejs config');
      }


      /**
       * Load code mirror css file.
       */
      function loadCss(url) {
        var cssId = 'code-mirror-css';

        if (!document.getElementById(cssId)){
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.id = cssId;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
      }
        
        /** 
        * Load code mirror theme css file.
        */
        function loadTheme(url) {

            var themeId = 'code-mirror-theme';
            
            if (!document.getElementById(themeId)) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                link.id = themeId;
                document.getElementsByTagName("head")[0].appendChild(link);
            }

        }

      /**
       * cm - config for codemirror loader from requirejs.config
       */
      var cm = config.cm;

      var scripts = [];

      /**
       * Add codemirror lib as first including script
       */
      scripts.push(cm.baseUrl + cm.path);

      if (name != '@'){
      	var modes = name.split('|');

      	for (var i = 0; i < modes.length; i++){
	        var mode = cm.baseUrl + cm.modes.path.replace(
	          new RegExp('{mode}', 'g'), modes[i]
	        );
	        scripts.push(mode);
	    }
      }

      loadCss(cm.css);
      loadTheme(cm.theme);

 	  /**
       * Require all scripts and as return values always will be codemirror object
       */
      require(scripts, function(CodeMirror){
        onload(CodeMirror);
      });
    }
  }
});

