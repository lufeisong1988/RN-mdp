import React,{Component} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { LargeList } from "react-native-largelist-v2";
import { contacts } from "./DataSource";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

class RefreshAndLoadingExampleStatic extends Component {
    _largeList;
    _index = 0;

    constructor(props) {
        super(props);
        this.state = { data: [{items:[]}], allLoaded: false };
    }

    render() {
        const List = this.props.native ? NativeLargeList : LargeList;
        return (
            <List
                ref={ref => (this._largeList = ref)}
                style={styles.container}
                data={this.state.data}
                // heightForSection={() => 40}
                // renderSection={this._renderSection}
                // heightForIndexPath={() => 60}
                // renderIndexPath={this._renderItem}
                refreshHeaderHeight={60}
                refreshHeader={NormalHeader}
                onRefresh={this._onRefresh}
                // loadingFooterHeight={60}
                // loadingFooter={NormalFooter}
                // onLoading={this._onLoading}
                // allLoaded={true}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
            />
        );
    }
    _renderHeader = () => {
        return (
            <View>
                <Text style={styles.header}>I am header</Text>
            </View>
        );
    };

    _renderFooter = () => {
        return (
            <View>
                <Text style={styles.header}>I am Footer</Text>
            </View>
        );
    };

    _onRefresh = () => {
        this._largeList.beginRefresh();
        setTimeout(() => {
            this._largeList.endRefresh();
            this._index = 0;
            this.setState({
                data: [contacts[this._index]],
                allLoaded: this._index > 2
            });
        }, 2000);
    };

    _onLoading = () => {
        this._largeList.beginLoading();
        setTimeout(() => {
            this._largeList.endLoading();
            this.setState(p => ({
                data: p.data.concat(contacts[++this._index]),
                allLoaded: this._index > 2
            }));
        }, 2000);
    };

    _renderSection = (section: number) => {
        const contact = this.state.data[section];
        return (
            <TouchableOpacity style={styles.section}>
                <Text style={styles.sectionText}>
                    {contact.header}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderItem = ({ section: section, row: row }) => {
        const contact = this.state.data[section].items[row];
        return (
            <TouchableOpacity style={styles.row}>
                <Image source={contact.icon} style={styles.image} />
                <View style={styles.rContainer}>
                    <Text style={styles.title}>
                        {contact.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {contact.phone}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    search: {
        marginTop: 20,
        fontSize: 18
    },
    section: {
        flex: 1,
        backgroundColor: "#EEE",
        justifyContent: "center"
    },
    sectionText: {
        fontSize: 20,
        marginLeft: 10
    },
    header: {
        alignSelf: "center",
        marginVertical: 50
    },
    row: { flex: 1, flexDirection: "row", alignItems: "center" },
    image: { marginLeft: 16, width: 44, height: 44 },
    rContainer: { marginLeft: 20 },
    title: { fontSize: 18 },
    subtitle: { fontSize: 14, marginTop: 8 }
});

export const RefreshAndLoadingExample = gestureHandlerRootHOC(
    RefreshAndLoadingExampleStatic
);