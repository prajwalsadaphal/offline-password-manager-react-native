import React ,{useState}from "react"
import {StyleSheet,TouchableOpacity} from "react-native"
import {Text, View ,Icon,Label} from "native-base"
import {deletePassword} from "../actions/manager"
import {connect} from "react-redux"

const PasswordList = ({name,username,password,id,deletePassword})=>{

    const [show , setShow]= useState(false)

    const onPressDeletePassword= ()=>{
        deletePassword(id)
    }

    const showInfo = ()=>{
        setShow(!show)
    }
    return(
        
        <View style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity  onPress={showInfo}> 
                    <Text style={styles.headingText} >{name}  </Text>
                    
                </TouchableOpacity>
               {show &&<>
               <View style={styles.showInnerContainer}>
                    <Label style={styles.label}>Username:</Label>
                    <Text style={styles.text}>{username}</Text>

                </View>
                <View style={styles.showInnerContainer}>
                    <Label style={styles.label}>Password:</Label>
                    <Text style={styles.text}>{password}</Text>
                </View>
            </>}
            
           </View>
           <Icon solid name="trash" style={styles.trashIcon} onPress={onPressDeletePassword}/>
           
        </View>
    )
}

const styles =  StyleSheet.create({
    container:{
     
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        marginTop:20

        
    },heading:{
        marginLeft:10,
        flexGrow:1,
        backgroundColor:"#00adb5",
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20
    },
    headingText:{
        width:"100%",
        fontSize:20,
        height:50,
        marginTop:10,
        textAlign:"center",
        color:"#fff",
    },
    text:{
        color:"#fff",
        marginLeft:"20%",
        marginBottom:10,
        marginRight:10,
        height:40,
        borderBottomWidth:1,
        borderBottomColor:"#eeeeee",
        textAlign:"center",
        borderColor:"#000",
        width:"40%"
    },
    showInnerContainer:{
        flex:1,
        flexDirection:"row"
    },
    trashIcon:{
        color:"red",
        flexGrow:0,
        backgroundColor:"#00adb5",
        paddingTop:15,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        marginRight:10
       
    },
    label:{
        marginLeft:10,
        color:"#fff"
    }
 
})


const mapDispatchToProps = {
    deletePassword:(id)=>deletePassword(id)
}

export default connect(null,mapDispatchToProps)(PasswordList)