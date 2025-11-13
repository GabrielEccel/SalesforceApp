import { Alert, Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import contactService from "../services/contactService";
import { contactCreateInterface, contactInterface } from "../types/contactInterface";
import { sanitizeContactEmail, sanitizeContactName, sanitizeContactPhone } from "../utils/sanitizeContact";
import Separator from "./separator";

type FeatherIconName = keyof typeof Feather.glyphMap

interface ContactModalInterface {
    contact?: contactInterface;
    visible: boolean;
    onClose: () => void;
    account?: string;
    onUpdate?: () => void;
}

export default function ContactModal({ contact, visible, onClose, account, onUpdate}: ContactModalInterface) {

    const { updateContactById, createContact } = contactService()

    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const [buttonLabel, setButtonLabel] = useState(!contact && !!account ? 'Salvar' : 'Fechar')
    const [buttonColor, setButtonColor] = useState(!contact && !!account ? '#023e8a' : '#023e8a')

    const [edit, setEdit] = useState(!contact && !!account)
    const [editIcon, setEditIcon] = useState<FeatherIconName>(!contact && !!account ? 'save' : 'edit')

    const [underlineColor, setUnderlineColor] = useState("transparent")

    const [name, setName] = useState(contact?.Name)
    const [phone, setPhone] = useState(contact?.Phone)
    const [email, setEmail] = useState(contact?.Email)
    const [title, setTitle] = useState(contact?.Title)

    useEffect(() => {
        if (visible) {
            handlePress()
            if (visible && account && !contact) {
                setEdit(true)
                setEditIcon('save')
                setButtonLabel('Cancelar')
                setButtonColor('#e5383b')
                setUnderlineColor('#023e8a')
            }
            else if (visible && !account && contact){
                setEdit(false)
                setEditIcon('edit')
                setButtonLabel('Fechar')
                setButtonColor('#023e8a')
                setUnderlineColor('transparent')
            }
        }
        else {
            handleClose()
        }
    }, [visible])

    const [originalValues, setOriginalValues] = useState({
        name: contact?.Name,
        phone: contact?.Phone,
        email: contact?.Email,
        title: contact?.Title
    })

    const styles = dynamicStyles(buttonColor)

    const handleSave = () => {
        if (contact) {
            handleEdit()
        } else {
            handleCreate()
        }
    }

    const handleCreate = async () => {
        if (!account) return;

        if (!name || !phone || !email || !title) {
            Alert.alert("Preencha todos os dados", "Algum dos dados pode não estar preenchido corretmente")
            return;
        };
        
        if(sanitizeContactPhone(phone) == true){
            Alert.alert("Telefone incorreto", "Não é permitido letras no campo telefone")
            return;
        }

        if(sanitizeContactEmail(email) == false){
            Alert.alert("Email incorreto", "Um email deve estar no padrão: nome@email.com")
            return;
        }

        if(sanitizeContactName(name)[1] === undefined){
            Alert.alert("Nome incorreto", "Insira pelo menos um sobrenome")
            return;
        }

        await createContact({
            FirstName: sanitizeContactName(name)[0],
            LastName: sanitizeContactName(name)[1],
            Phone: phone,
            Email: email,
            Title: title,
            AccountId: account
        } as contactCreateInterface)
        onUpdate?.(); 
        handleClose()

    }

    const handleEdit = () => {
        if (!contact) return;
        if (!edit) {
            setEdit(true)
            setUnderlineColor("#023e8a")
            setButtonLabel("Cancelar")
            setButtonColor("#e5383b")
            setEditIcon("save")
        }
        else {
            updateContactById(contact.Id, {
                Phone: phone,
                Email: email,
                Title: title
            } as contactInterface)

            setOriginalValues({
                name,
                phone,
                email,
                title
            })
            onUpdate?.(); 
            handleClose(false)
        }
    }

    const handlePress = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleClose = (restore: boolean = true) => {
        if (restore) {
            setName(originalValues.name)
            setPhone(originalValues.phone)
            setEmail(originalValues.email)
            setTitle(originalValues.title)
        };
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.9,
                useNativeDriver: true,
                tension: 200,
                friction: 100
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => onClose());
    };

    return (
        <Modal visible={visible} transparent animationType="none">
            <Animated.View
                style={[
                    styles.overlay,
                    {
                        opacity: opacityAnim,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.detailCard,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={{ flexDirection: "row", alignItems: "center", width: '100%', paddingLeft: 15 }}>
                    <TextInput style={styles.detailTitle}
                        editable={!contact && !!account}
                        placeholder="Nome"
                        mode='flat'
                        underlineColor='transparent'
                        selectionHandleColor={'#023e8a'}
                        selectionColor="#dee2e6"
                        cursorColor="#023e8a"
                        textColor="#343a40"
                        activeUnderlineColor='transparent'
                        value={name}
                        onChangeText={setName}
                        selection={edit ? undefined : { start: 0, end: 0 }}
                        key={edit ? "edit" : "readonly"}
                    />
                    <TouchableOpacity style={styles.edit} onPress={handleSave}>
                        <Feather name={editIcon} color="#343a40" size={22} />
                    </TouchableOpacity>
                </View>
                <Separator color={!contact && !!account ? '#023e8a' : 'transparent'} margin={1}/>
                <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                    <TextInput style={styles.detailInfo}
                        editable={edit}
                        placeholder="Telefone"
                        mode='flat'
                        underlineColor='transparent'
                        selectionHandleColor={'#023e8a'}
                        selectionColor="#dee2e6"
                        cursorColor="#023e8a"
                        activeUnderlineColor='transparent'
                        textColor="#6c757d"
                        value={phone}
                        onChangeText={setPhone}
                        left={<TextInput.Icon icon="cellphone" color="#023e8a" />}
                        selection={edit ? undefined : { start: 0, end: 0 }}
                        key={edit ? "edit" : "readonly"}
                    />
                </View>
                <Separator color={underlineColor} margin={1}/>
                <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                    <TextInput style={styles.detailInfo}
                        editable={edit}
                        placeholder="Email"
                        mode='flat'
                        underlineColor='transparent'
                        selectionHandleColor={'#023e8a'}
                        selectionColor="#dee2e6"
                        cursorColor="#023e8a"
                        activeUnderlineColor='transparent'
                        textColor="#6c757d"
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon icon="email" color="#023e8a" />}
                        selection={edit ? undefined : { start: 0, end: 0 }}
                        key={edit ? "edit" : "readonly"}
                    />
                </View>
                <Separator color={underlineColor} margin={1}/>
                <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                    <TextInput style={styles.detailInfo}
                        editable={edit}
                        placeholder="Cargo"
                        mode='flat'
                        underlineColor='transparent'
                        selectionHandleColor={'#023e8a'}
                        selectionColor="#dee2e6"
                        cursorColor="#023e8a"
                        activeUnderlineColor='transparent'
                        textColor="#6c757d"
                        value={title}
                        onChangeText={setTitle}
                        left={<TextInput.Icon icon="format-title" color="#023e8a" />}
                        selection={edit ? undefined : { start: 0, end: 0 }}
                        key={edit ? "edit" : "readonly"}
                    />
                </View>
                <Separator color={underlineColor} margin={1}/>
                <TouchableOpacity style={styles.closeBtn} onPress={() => handleClose()}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>{buttonLabel}</Text>
                </TouchableOpacity>

            </Animated.View>
        </Modal>
    )
}

const dynamicStyles = (color: string) => StyleSheet.create({
    container: {
        backgroundColor: "#3a6ea5",
        height: 200,
        width: 200,
        borderRadius: 12,
        padding: 20,
        marginRight: 1,
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    info: {
        marginTop: 12,
        gap: 10,
    },
    infoTxt: {
        color: "white",
        fontSize: 12,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    detailCard: {
        position: "absolute",
        top: '25%',
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 24,
        elevation: 10,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: "bold",
        backgroundColor: 'transparent',
        width: '80%',
        textAlign: 'left',
        direction: 'ltr'
    },
    edit: {
        position: 'absolute',
        right: 20,
    },
    detailInfo: {
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    closeBtn: {
        backgroundColor: color,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 24,
        alignItems: "center",
    },
});