declare module "react-native-maps" {
  import * as React from "react";
  import { ViewProps } from "react-native";

  export interface MapViewProps extends ViewProps {
    provider?: any;
    region?: any;
    initialRegion?: any;
    onRegionChange?: (region: any) => void;
    onRegionChangeComplete?: (region: any) => void;
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
  }

  export default class MapView extends React.Component<MapViewProps> {}
  export const Marker: React.ComponentType<any>;
  export const Circle: React.ComponentType<any>;
  export const PROVIDER_GOOGLE: any;

  export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
}
