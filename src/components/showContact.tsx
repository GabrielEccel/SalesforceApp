import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { contactInterface } from "../types/contactInterface";
import Separator from "./separator";
import { useRef, useState } from "react";
import { TextInput } from 'react-native-paper';
import contactService from "../services/contactService";

type FeatherIconName = keyof typeof Feather.glyphMap

interface ShowContactProps {
    contact: contactInterface;
}

export default function ShowContact({ contact }: ShowContactProps) {
    const { updateContactById } = contactService()

    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const [visible, setVisible] = useState(false);

    const [buttonLabel, setButtonLabel] = useState("Fechar")
    const [buttonColor, setButtonColor] = useState("#023e8a")

    const [edit, setEdit] = useState(false)
    const [editIcon, setEditIcon] = useState<FeatherIconName>("edit")

    const [underlineColor, setUnderlineColor] = useState("transparent")

    const [name, setName] = useState(contact.Name)
    const [phone, setPhone] = useState(contact.Phone)
    const [email, setEmail] = useState(contact.Email)
    const [title, setTitle] = useState(contact.Title)

    const [originalValues, setOriginalValues] = useState({
        name: contact.Name,
        phone: contact.Phone,
        email: contact.Email,
        title: contact.Title
    })

    const styles = dynamicStyles(buttonColor)

    const handleEdit = () => {
        if (editIcon === "edit") {
            setEdit(true)
            setUnderlineColor("#023e8a")
            setButtonLabel("Cancelar")
            setButtonColor("#e5383b")
            setEditIcon("save")
        }
        if (editIcon === "save") {
            updateContactById(contact.Id, {
                Phone: phone,
                Email: email,
                Title: title
            })

            setOriginalValues({
                name,
                phone,
                email,
                title
            })

            handleClose(false)
        }
    }

    const handlePress = () => {
        setVisible(true);
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
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
        setUnderlineColor("transparent")
        setEdit(false)
        setButtonColor('#023e8a')
        setEditIcon('edit')
        setButtonLabel('Fechar')
    };

    return (
        <>
            <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handlePress}>
                <Text style={styles.name}>
                    {contact.Salutation} {contact.Name}
                </Text>
                <Separator color="white" margin={5} />
                <View style={styles.info}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="smartphone" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Phone}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="mail" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="type" color="white" size={16} />
                        <Text style={styles.infoTxt}> {contact.Title}</Text>
                    </View>
                </View>
            </TouchableOpacity>

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
                            editable={false}
                            placeholder="Nome"
                            mode='flat'
                            underlineColor={"transparent"}
                            selectionHandleColor={'#023e8a'}
                            selectionColor="#dee2e6"
                            cursorColor="#023e8a"
                            textColor="#343a40"
                            activeUnderlineColor="#023e8a"
                            value={name}
                            selection={edit ? undefined : { start: 0, end: 0 }}
                            key={edit ? "edit" : "readonly"}
                        />
                        <TouchableOpacity style={styles.edit} onPress={handleEdit}>
                            <Feather name={editIcon} color="#343a40" size={22} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                        <TextInput style={styles.detailInfo}
                            editable={edit}
                            placeholder="Telefone"
                            mode='flat'
                            underlineColor={underlineColor}
                            selectionHandleColor={'#023e8a'}
                            selectionColor="#dee2e6"
                            cursorColor="#023e8a"
                            activeUnderlineColor="#023e8a"
                            textColor="#6c757d"
                            value={phone}
                            onChangeText={setPhone}
                            left={<TextInput.Icon icon="cellphone" color="#023e8a" />}
                            selection={edit ? undefined : { start: 0, end: 0 }}
                            key={edit ? "edit" : "readonly"}
                        />
                    </View>

                    <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                        <TextInput style={styles.detailInfo}
                            editable={edit}
                            placeholder="Email"
                            mode='flat'
                            underlineColor={underlineColor}
                            selectionHandleColor={'#023e8a'}
                            selectionColor="#dee2e6"
                            cursorColor="#023e8a"
                            activeUnderlineColor="#023e8a"
                            textColor="#6c757d"
                            value={email}
                            onChangeText={setEmail}
                            left={<TextInput.Icon icon="email" color="#023e8a" />}
                            selection={edit ? undefined : { start: 0, end: 0 }}
                            key={edit ? "edit" : "readonly"}
                        />
                    </View>

                    <View style={{ flexDirection: "row", paddingLeft: 15 }}>
                        <TextInput style={styles.detailInfo}
                            editable={edit}
                            placeholder="Cargo"
                            mode='flat'
                            underlineColor={underlineColor}
                            selectionHandleColor={'#023e8a'}
                            selectionColor="#dee2e6"
                            cursorColor="#023e8a"
                            activeUnderlineColor="#023e8a"
                            textColor="#6c757d"
                            value={title}
                            onChangeText={setTitle}
                            left={<TextInput.Icon icon="format-title" color="#023e8a" />}
                            selection={edit ? undefined : { start: 0, end: 0 }}
                            key={edit ? "edit" : "readonly"}
                        />
                    </View>

                    <TouchableOpacity style={styles.closeBtn} onPress={() => handleClose()}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>{buttonLabel}</Text>
                    </TouchableOpacity>

                </Animated.View>
            </Modal>
        </>
    );
}

const dynamicStyles = (color: string) => StyleSheet.create({
    container: {
        backgroundColor: "#3a6ea5",
        height: 200,
        width: 200,
        borderRadius: 12,
        padding: 20,
        marginRight: 16,
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
