import { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { opportunityProductsInterface } from "../types/opportunityProductsInterface";
import { colors } from "../global/colors";
import { TextInput } from "react-native-paper";
import ProductService from "../services/productsService";

interface ProductModalInterface {
    product: opportunityProductsInterface;
    visible: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function ProductModal({ product, visible, onClose, onUpdate }: ProductModalInterface) {
    const { editOpportunityLineItem } = ProductService();

    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const [quantity, setQuantity] = useState('')

    useEffect(() => {
        if (visible) {
            handlePress()
            setQuantity(String(product.Quantity))
        }
        else {
            handleClose()
        }
    }, [visible])


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

    const handleClose = () => {
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

    const handleSave = async () => {
        await editOpportunityLineItem(product.Id, {
            Quantity: Number(quantity),
            UnitPrice: product.UnitPrice
        })
        onUpdate()
        handleClose()
    }

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

                <View style={styles.container}>
                    <Text style={styles.detailTitle} numberOfLines={2}>{product.Product2.Name}</Text>
                    <View style={{ paddingLeft: 15, marginTop: 15 }}>
                        <TextInput style={styles.detailInfo}
                            label={'Quantidade'}
                            editable={true}
                            mode='outlined'
                            underlineColor='transparent'
                            selectionHandleColor={colors.darkBlue}
                            selectionColor={colors.lightGray}
                            cursorColor={colors.darkBlue}
                            activeUnderlineColor='transparent'
                            textColor={colors.midGray}
                            value={quantity}
                            onChangeText={setQuantity}
                            outlineColor={colors.darkBlue}
                            activeOutlineColor={colors.darkBlue}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={() => handleSave()} style={styles.saveBtn}>
                            <Text style={styles.btnText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleClose()} style={styles.closeBtn}>
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.backgroundBlack,
    },
    detailCard: {
        position: "absolute",
        top: '25%',
        left: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 24,
        padding: 24,
        elevation: 10,
    },
    container: {
        flex: 1,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: "bold",
        flexShrink: 1,
        color: colors.darkGray,
        marginLeft: 15
    },
    detailInfo: {
        fontSize: 16,
        backgroundColor: 'transparent',
        width: '80%',
        textAlign: 'left',
        direction: 'ltr'
    },
    btnView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    closeBtn: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 24,
        alignItems: "center",
        width: 140
    },
    saveBtn: {
        backgroundColor: colors.darkBlue,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 24,
        alignItems: "center",
        width: 140
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    }
})