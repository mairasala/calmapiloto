(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['backbone/templates/init'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<div class='jumbotron'>\n  <h1>" + ($e($c("Calma Piloto!"))) + "</h1>\n  <p>" + ($e($c("A ideia é com o celular gravar com os sensores do celular o comportamento do onibus durante um recorrido no Rio de Janeiro. Clique nos botões para indicar o tipo de atividade que esta acontecendo para ajudar a aplicação a interpretar esses dados."))) + "</p>\n  <a class='btn btn-lg btn-primary' id='record' href='javascript:void(0);'>" + ($e($c("Iniciar Jornada"))) + "</a>\n</div>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);

(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['backbone/templates/journey'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<div class='centered-content jumbotron'>\n  <h2>" + ($e($c(this.activity))) + "</h2>\n  <div class='mtop10 row'>\n    <button class='btn btn-warning' id='stopping'>" + ($e($c("freando"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn btn-danger' id='stop'>" + ($e($c("parado"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn btn-primary' id='accelerating'>" + ($e($c("acelerando"))) + "</button>\n  </div>\n  <div class='mtop10 row'>\n    <button class='btn' id='moving'>" + ($e($c("em movimento"))) + "</button>\n  </div>\n</div>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
