import { useLocalSearchParams } from "expo-router";
import Products from "../../src/pages/products/products";

export default function(){
    const { id } = useLocalSearchParams()

    return <Products id={id as string}></Products>
}