import { Product, User } from '../models/index_model.js';


const organizedDataSQL = data => {

    let dataProduct = {};

    dataProduct['name'] = data.name;
    dataProduct['img'] = data.img == undefined ? null : data.img;
    dataProduct['marketObservations'] = data.marketObservations;
    dataProduct['reference'] = data.reference;
    dataProduct['url_video'] = data.url_video;
    dataProduct['videoExtra1'] = data.videoExtra1;
    dataProduct['urlExtra1'] = data.urlExtra1;
    dataProduct['urlExtra2'] = data.urlExtra2;
    dataProduct['urlExtra3'] = data.urlExtra3;
    dataProduct['etiquetaEnlace1'] = data.etiquetaEnlace1;
    dataProduct['etiquetaEnlace2'] = data.etiquetaEnlace2;
    dataProduct['etiquetaEnlace3'] = data.etiquetaEnlace3;

    for(let i=0; i<=4; i++){
        if(data.features[i] != null){
            dataProduct['feature'+[i+1]] = data.features[i];
        }

        if(data.adventages[i] != null){
            dataProduct['adventage'+[i+1]] = data.adventages[i];
        }

    }

    console.log("dataprod1", dataProduct)

    for(let i=0; i<=11; i++){
        if(data.markets[i] != null){
            dataProduct['market'+[i+1]] = data.markets[i];
            dataProduct['description_market'+[i+1]] = data.descriptionsMarkets[i];
            dataProduct['observations'+[i+1]] = data.marketObservations[i] == undefined ? null : data.marketObservations[i];
        }else{
            dataProduct['market'+[i+1]] = null;
            dataProduct['description_market'+[i+1]] = null;
            dataProduct['observations'+[i+1]] = null;
        }
    }
    console.log('DATAPRODUCT', dataProduct)
    return dataProduct;

}

const formaterProduct = async (dataSQL) => {

    let datasql = {
        "id" : dataSQL.id,
        "img": dataSQL.img,
        "name": dataSQL.name,
        "reference": dataSQL.reference,
        "state": dataSQL.state,
        "createdAt": dataSQL.createdAt,
        "updatedAt": dataSQL.updatedAt,
        "url_video": dataSQL.url_video,
        "videoExtra1": dataSQL.videoExtra1,
        "urlExtra1": dataSQL.urlExtra1,
        "urlExtra2": dataSQL.urlExtra2,
        "urlExtra3": dataSQL.urlExtra3,
        "etiquetaEnlace1": dataSQL.etiquetaEnlace1,
        "etiquetaEnlace2": dataSQL.etiquetaEnlace2,
        "etiquetaEnlace3": dataSQL.etiquetaEnlace3,
        "markets" : [],
        "descriptionsMarkets" : [],
        "observationsMarkets" : [],
        "features" : [],
        "observationsFeature" : [],
        "advantages" : [],
        "observationsAdvantage" : []
    }

    for(let i=0; i<=11; i++){
        if(dataSQL['market'+[i+1]] != null){
            datasql.markets.push(dataSQL['market'+[i+1]]);
            datasql.descriptionsMarkets.push(dataSQL['description_market'+[i+1]]);
        };
        if(dataSQL['market'+[i+1]] != null){
            datasql.observationsMarkets.push(dataSQL['observations'+[i+1]]);
        };
        
    }

    for(let i=0; i<=4; i++){
        datasql.features.push(dataSQL['feature'+[i+1]]);
        datasql.advantages.push(dataSQL['adventage'+[i+1]]);
        datasql.observationsFeature.push(dataSQL['observationsFeature' + [i+1]]);
        datasql.observationsAdvantage.push(dataSQL['observationsAdventage' + [i+1]]);
  
    }


    //Busca el usaurio enlazado en el producto que se acaba de crear, para obtener sus valores.
    const data = await Product.findOne({ 
        where : { id : dataSQL.id },
        include:[
            { model : User.scope('deletePassword')}
        ]
    })

    /*
        Agrega al archivo retornado por formaterProduct el userId y la información del User
        para retornarlo a la respuesta del API
    */
    datasql['userId'] = data.userId;
    datasql['user'] = {
        "id" : data.User.id,
        "name" : data.User.name,
        "email" : data.User.email,
        "cargo" : data.User.cargo,
        "rolId" : data.User.rolId,
        "token" : data.User.token,
    }

    return datasql;

}

export {
    organizedDataSQL,
    formaterProduct
}