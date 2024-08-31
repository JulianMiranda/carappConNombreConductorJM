import React, {useContext, useEffect} from 'react';
import {Fab} from '../components/Fab';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {TravelContext} from '../context/travel/TravelContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/topTabsNavigator';
import {TravelListCard} from '../components/TravelListCard';
import {ListTravelEmpty} from '../components/ListTravelEmpty';
import useTravelProposal from '../hooks/useTravelProposal';
import {TravelOffer} from '../interfaces/TravelInfo.interface';
interface Props extends StackScreenProps<RootStackParams, 'FastListSreen'> {}

export const FastListSreen = ({navigation}: Props) => {
  const {listTravelFast, isLoadingSearch, searchListTravelFast} =
    useContext(TravelContext);

  const {isLoading, acceptTravel} = useTravelProposal();

  const handleAccept = (travel: TravelOffer) => {
    acceptTravel(travel);
  };

  useEffect(() => {
    searchListTravelFast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('isLoadingSearch', isLoadingSearch);
    console.log('listTravelFast.length', listTravelFast.length);
  }, [isLoadingSearch, listTravelFast]);

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
      {!isLoadingSearch && listTravelFast.length === 0 && <ListTravelEmpty />}

      <FlatList
        style={styles.container}
        data={listTravelFast}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TravelListCard
            travel={item}
            isLoading={isLoading}
            handleAccept={handleAccept}
          />
        )}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 4,
  },
});
