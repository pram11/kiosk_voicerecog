import {StyleSheet} from 'react-native'

const INDIGO = "#010135"
const YELLOW = "#EFAF13"
const LIGHT_INDIGO = "#3D3C54"
export default styles = StyleSheet.create({
    background:{
        backgroundColor:INDIGO
    },
    background_cart:{
        backgroundColor:LIGHT_INDIGO
    },
    button:{
        backgroundColor:YELLOW,
        borderWidth:2,
        borderColor:"white",
        borderStyle:"solid"
    },
    yellow_underline:{
        borderBottomColor:YELLOW,
        borderBottomWidth:4,
        borderStyle:"solid"
    },
    yellow_color:{
        color:YELLOW
    },
    yellow_border:{
        borderStyle:"solid",
        borderColor:YELLOW,
    },
    normalFont:{
        fontFamily:"KoPubWorld Dotum Bold"
    },
    navItemFont:{
        fontFamily:"BMHANNA11"//temp
    }
})