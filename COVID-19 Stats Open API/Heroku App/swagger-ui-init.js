
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
	"swaggerDoc": {
	"swagger": "2.0",
	"info": {
    "title": "COVID OPEN API",
    "description": "Simple API that provides real-time-data of total cases and deaths of COVID-19",
    "contact": {
      "email": "sfdcnads@gmail.com"
    },
    "version": "1.0.0"
  },
  "externalDocs": {
    "description": "Read more @ ForcePanda",
    "url": "http://forcepanda.wordpress.com/"
  },
  "host": "covid19-open.herokuapp.com",
  "schemes": [
    "https"
  ],
  "paths": {
    "/cases/{country}": {
      "get": {
        "tags": [
          "Total cases by country"
        ],
        "summary": "Total cases by country",
        "parameters": [
          {
            "name": "country",
            "in": "path",
            "description": "Name of country (English)",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/caseCountResponse"
            }
          }
        }
      }
    },
    "/deaths/{country}": {
      "get": {
        "tags": [
          "Death count by country"
        ],
        "summary": "Death count by country",
        "parameters": [
          {
            "name": "country",
            "in": "path",
            "description": "Name of country (English)",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/deathCountResponse"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "caseCountResponse": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "cases": {
          "type": "integer",
          "format": "int64"
        }
      }
    },
    "deathCountResponse": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "deaths": {
          "type": "integer",
          "format": "int64"
        }
      }
    }
  }
}};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
