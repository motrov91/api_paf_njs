import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Product = db.define('Products', {
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reference:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    market1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market6:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market6:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations6:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market7:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market7:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations7:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market8:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market8:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations8:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market9:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market9:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations9:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market10:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market10:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations10:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market11:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market11:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations11:{
        type: DataTypes.STRING,
        allowNull: true
    },
    market12:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description_market12:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observations12:{
        type: DataTypes.STRING,
        allowNull: true
    },
    feature1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsFeature1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    feature2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsFeature2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    feature3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsFeature3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    feature4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsFeature4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    feature5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsFeature5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    url_video:{ 
        type: DataTypes.STRING,
        allowNull: true
    },
    adventage1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsAdventage1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    adventage2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsAdventage2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    adventage3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsAdventage3:{
        type: DataTypes.STRING,
        allowNull: true
    },
    adventage4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsAdventage4:{
        type: DataTypes.STRING,
        allowNull: true
    },
    adventage5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    observationsAdventage5:{
        type: DataTypes.STRING,
        allowNull: true
    },
    
},{
    scopes:{
        deleteDates:{
            attributes:{
                exclude: [, 'createdAt', 'updatedAt']
            }
        }
    }
});

export default Product;