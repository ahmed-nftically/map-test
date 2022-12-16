L.GeoJSON.VT = L.GridLayer.extend({
    options: {
        async: false,
    },

    initialize: function (geojson, options) {
        L.setOptions(this, options);
        L.GridLayer.prototype.initialize.call(this, options);
        this.tileIndex = geojsonvt(geojson, this.options);
    },

    createTile: function (coords) {
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create("canvas", "leaflet-tile");
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var ctx = tile.getContext("2d");
        // return the tile so it can be rendered on screen
        var tileInfo = this.tileIndex.getTile(coords.z, coords.x, coords.y);
        var features = tileInfo ? tileInfo.features : [];
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            this.drawFeature(ctx, feature);
        }
        return tile;
    },

    drawFeature: function (ctx, feature) {
        debugger;
        var typeChanged = type !== feature.type,
            type = feature.type;
        ctx.beginPath();
        if (this.options.style) this.options.style instanceof Function ? this.setStyle(ctx, this.options.style(feature.tags), feature.tags.Layer) : this.setStyle(ctx, this.options.style, feature.tags.Layer);
        if (type === 2 || type === 3) {
            for (var j = 0; j < feature.geometry.length; j++) {
                var ring = feature.geometry[j];
                for (var k = 0; k < ring.length; k++) {
                    var p = ring[k];
                    if (k) ctx.lineTo(p[0] / 16.0, p[1] / 16.0);
                    else ctx.moveTo(p[0] / 16.0, p[1] / 16.0);
                }
            }
        } else if (type === 1) {
            for (var j = 0; j < feature.geometry.length; j++) {
                var p = feature.geometry[j];
                ctx.arc(p[0] / 16.0, p[1] / 16.0, 2, 0, Math.PI * 2, true);
            }
        }
        if (type === 3) {
            ctx.fill(this.options.style.fillRule || "evenodd");
            ctx.strokeStyle = 'white';
        }

        ctx.stroke();
    },

    setStyle: function (ctx, style, Layer) {
        debugger;
        var stroke = style.stroke || true;
        if (stroke) {
            ctx.lineWidth = style.weight || 1;
            var color = this.setOpacity(style.color, style.opacity);
            ctx.strokeStyle = color;
        } else {
            ctx.lineWidth = 0;
            ctx.strokeStyle = {};
        }
        var fill = style.fill || true;
        if (fill) {
            // --------------------------------- Land Sizes ------------------------------- //
            //1x1 Land parcel
            if (Layer == "H 1X1 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#c9940d", "#c9940d");
                ctx.fillStyle = color;
            }

            //2x2 Land parcel
            else if (Layer == "H 2X2 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#b50b0b", "#b50b0b");
                ctx.fillStyle = color;
            }

            //4x4 Land parcel
            else if (Layer == "H 4X4 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#26cafc", "#26cafc");
                ctx.fillStyle = color;
            }

            //8x8 Land parcel
            else if (Layer == "H 8X8 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#6a059a", "#6a059a");
                ctx.fillStyle = color;
            }

            //16x16 Land parcel
            else if (Layer == "H 16X16 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#ae1a77", "#ae1a77");
                ctx.fillStyle = color;
            }

            //32x32 Land parcel
            else if (Layer == "H 32X32 HATCH") {
                ctx.fillStyle = "#3A0823";
                var color = this.setOpacity("#687cde", "#687cde");
                ctx.fillStyle = color;
            }


            // --------------------------------- Environment ------------------------------- //           

            //artificial Lake
            else if (Layer == "H-ART WATER") {
                ctx.fillStyle = "#0B558A";
                var color = this.setOpacity("#a5c4ca", "#a5c4ca");
                ctx.fillStyle = color;
            }

            //Forest
            else if (Layer == "H-DARK GREEN") {
                ctx.fillStyle = "#125937";
                var color = this.setOpacity("#81a28a", "#81a28a");
                ctx.fillStyle = color;
            }

            //unknown
            else if (Layer == "H-HATCH R60") {
                ctx.fillStyle = "#000000";
                var color = this.setOpacity("#3bb50b", "#3bb50b");
                ctx.fillStyle = color;
            }

            //unknown
            else if (Layer == "H-HATHC R90") {
                ctx.fillStyle = "#000000";
                var color = this.setOpacity("#ff0000", "#ff0000");
                ctx.fillStyle = color;
            }

            //Base and garden
            else if (Layer == "H-LIGHT GREEN") {
                ctx.fillStyle = "#363738";
                var color = this.setOpacity("#b2caa8", "#b2caa8");
                ctx.fillStyle = color;
            }

            //lakes pounds
            else if (Layer == "H-NAT WATER") {
                ctx.fillStyle = "#0B558A";
                var color = this.setOpacity("#7d93a1", "#7d93a1");
                ctx.fillStyle = color;
            }

            //empty area
            else if (Layer == "H-NFTically") {
                ctx.fillStyle = "#2A292E";
                var color = this.setOpacity("#9d7275", "#9d7275");
                ctx.fillStyle = color;
            }

            //platforms on corners
            else if (Layer == "H-PLATFORMS") {
                ctx.fillStyle = "#000000";
                var color = this.setOpacity("#b3ce99", "#b3ce99");
                ctx.fillStyle = color;
            }

            //beaches
            else if (Layer == "H-SAND") {
                ctx.fillStyle = "#7C8261";
                var color = this.setOpacity("#dedbb3", "#dedbb3");
                ctx.fillStyle = color;
            }

            //Soil Land
            else if (Layer == "H-SOIL LAND") {
                ctx.fillStyle = "#513F1D";
                var color = this.setOpacity("#beac98", "#beac98");
                ctx.fillStyle = color;
            } else {
                ctx.fillStyle = style.fillColor || "#000000";
                var color = this.setOpacity(style.fillColor, style.fillOpacity);
                ctx.fillStyle = color;
            }

        } else {
            ctx.fillStyle = {};
        }
    },

    setOpacity: function (color, opacity) {
        if (opacity) {
            var color = color || "#000000";
            if (color.iscolorHex()) {
                var colorRgb = color.colorRgb();
                return (
                    "rgba(" +
                    colorRgb[0] +
                    "," +
                    colorRgb[1] +
                    "," +
                    colorRgb[2] +
                    "," +
                    opacity +
                    ")"
                );
            } else {
                return color;
            }
        } else {
            return color;
        }
    },
});





L.geoJson.vt = function (geojson, options) {
    return new L.GeoJSON.VT(geojson, options);
};



String.prototype.iscolorHex = function () {
    var sColor = this.toLowerCase();
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    return reg.test(sColor);
};

String.prototype.colorRgb = function () {
    var sColor = this.toLowerCase();
    if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
    }
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
};
