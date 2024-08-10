// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// https://rickandmortyapi.com/api/character/ es la URL si queremos consumir todos los personajes
// nos devuelve un objeto json con una propiedad info, donde tienen el total de los resultados, el numero de paginas, la next y la prev
// y una propiedad results conm los datos de los personajes
export const environment = {
  production: false,
  baseUrlAPI: 'https://rickandmortyapi.com/api/character/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
