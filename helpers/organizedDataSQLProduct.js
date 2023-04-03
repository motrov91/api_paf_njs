import { Product, User } from '../models/index_model.js';


const organizedDataSQL = data => {

    let dataProduct = {};

    dataProduct['name'] = data.name;
    dataProduct['img'] = data.img == undefined ? null : data.img;
    dataProduct['reference'] = data.reference;
    dataProduct['url_video'] = data.url_video;


    for(let i=0; i<=4; i++){
        if(data.features[i] != null){
            dataProduct['feature'+[i+1]] = data.features[i];
        }

        if(data.adventages[i] != null){
            dataProduct['adventage'+[i+1]] = data.adventages[i];
        }

    }

    for(let i=0; i<=11; i++){

        if(data.markets[i] != null){
            dataProduct['market'+[i+1]] = data.markets[i];
            dataProduct['description_market'+[i+1]] = data.descriptionsMarkets[i];
        }
    }

    return dataProduct;

}

const formaterProduct = async (dataSQL) => {

    console.log('ingresa formater')

    let datasql = {
        "id" : dataSQL.id,
        "img": dataSQL.img,
        "name": dataSQL.name,
        "reference": dataSQL.reference,
        "state": dataSQL.state,
        "createdAt": dataSQL.createdAt,
        "updatedAt": dataSQL.updatedAt,
        "url_video": dataSQL.url_video,
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
        // if(dataSQL['feature'+[i+1]] != null){
            
        // };

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