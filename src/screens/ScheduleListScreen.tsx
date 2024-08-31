import React, {useContext, useEffect} from 'react';
import {Fab} from '../components/Fab';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/topTabsNavigator';
import {TravelContext} from '../context/travel/TravelContext';
import {ListTravelEmpty} from '../components/ListTravelEmpty';
import {TravelListCard} from '../components/TravelListCard';

interface Props
  extends StackScreenProps<RootStackParams, 'ScheduleListScreen'> {}
export const ScheduleListScreen = ({navigation}: Props) => {
  const {listTravelSchedule, isLoadingSearch, searchListTravelSchedule} =
    useContext(TravelContext);
  useEffect(() => {
    searchListTravelSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Fab
        iconName="close"
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
        styleButton={styles.closeButtonShadow}
      />
      {isLoadingSearch && (
        <View style={styles.containerLoading}>
          <ActivityIndicator color={'c1c1c1'} size={26} />
        </View>
      )}
      {!isLoadingSearch && listTravelSchedule.length === 0 && (
        <ListTravelEmpty />
      )}

      <FlatList
        style={styles.container}
        data={listTravelSchedule}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TravelListCard travel={item} />}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 50,
    zIndex: 999999999999999999,
  },
  closeButtonShadow: {
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 4,
  },
});
