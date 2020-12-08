import { ADDRESS_API_URL, makeLocationQuery } from '../utils/Constant';
import fetchData from './fetchData';

export interface AddressResponse {
    meta: Meta;
    address: Address;
    roadAddress: RoadAddress;
}

interface RoadAddress {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
}

interface Address {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
}

interface Meta {
    total_count: number;
}

interface RawAddressResponse {
    meta: Meta;
    documents: RawDocument;
}

interface RawDocument {
    address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        mountain_yn: string;
        main_address_no: string;
        sub_address_no: string;
    };
    road_address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        road_name: string;
        underground_yn: string;
        main_building_no: string;
        sub_building_no: string;
        building_name: string;
        zone_no: string;
    };
}

export default async function findAddress(latitude: number, longitude: number): Promise<AddressResponse> {
    const query = makeLocationQuery(latitude, longitude);
    const rawAddressResponse = await fetchData<RawAddressResponse>(ADDRESS_API_URL, query);
    const address = rawAddressResponse.documents[0].address as Address;
    const roadAddress = rawAddressResponse.documents[0].road_address as RoadAddress;
    const meta = rawAddressResponse.meta;
    return {
        meta,
        address,
        roadAddress,
    };
}
