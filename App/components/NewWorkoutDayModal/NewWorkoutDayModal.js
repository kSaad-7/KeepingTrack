import {
  collection,
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import React, {useState} from 'react';
import {Modal, Text} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import Icon from 'react-native-vector-icons/Ionicons';
import {db} from '../../firebase.config';
import {LoginButtonText} from '../../screens/Login/LoginScreen.styles';

import {
  BackTouchable,
  Container,
  MainContent,
  ModalContent,
  ModalTitle,
  NewDayButton,
  StyledCustomInput,
  StyledView,
} from './NewWorkoutDayModal.styles';

export const NewWorkoutDayModal = ({
  showNewDayModal,
  setShowNewDayModal,
  user,
  setUser,
}) => {
  const [dayName, setDayName] = useState('');

  const handleAddDayPress = async () => {
    const userRef = doc(db, 'users', `${user.docId}`);
    if (!dayName) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a name for the workout day',
      });
      return;
    }
    const dayNumber = user.workoutSplitLength + 1;
    const workoutSplitSubCollectionRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
    );
    await setDoc(doc(workoutSplitSubCollectionRef, `day${dayNumber}`), {
      name: dayName,
      docId: `day${dayNumber}`,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setUser({...user, workoutSplitLength: dayNumber});
    await updateDoc(userRef, {
      workoutSplitLength: increment(1),
    });
  };

  return (
    <GestureRecognizer onSwipeDown={() => setShowNewDayModal(false)}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewDayModal}
        onRequestClose={() => {
          setShowNewDayModal(false);
        }}>
        <Container>
          <StyledView>
            <ModalContent>
              <BackTouchable onPress={() => setShowNewDayModal(false)}>
                <Icon
                  name={'chevron-down-outline'}
                  size={30}
                  color={'#246EE9'}
                />
                <ModalTitle>Create a new workout day</ModalTitle>
              </BackTouchable>
              <MainContent>
                <StyledCustomInput
                  placeholder="e.g. Push day"
                  onChangeText={userInput => setDayName(userInput)}
                  value={dayName}
                />
                <NewDayButton onPress={handleAddDayPress}>
                  <LoginButtonText>Create new day</LoginButtonText>
                </NewDayButton>
              </MainContent>
            </ModalContent>
          </StyledView>
        </Container>
        <Toast />
      </Modal>
    </GestureRecognizer>
  );
};
