import React from 'react';
import {Text, Modal, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/appColors/Colors';

import {
  BackTouchable,
  MainContent,
  Container,
  ModalContent,
  TopHeaderView,
  ModalTitleView,
  TitleText,
  StyledView,
} from './ExerciseInputModal.styles';

export const ExerciseInputModal = ({
  showInputModal,
  setShowInputModal,
  exerciseValues,
  setExerciseValues,
}) => {
  const closeModal = () => {
    setShowInputModal(false);
    setExerciseValues({});
  };

  const {name, weight, sets, reps} = exerciseValues;
  return (
    <GestureRecognizer onSwipeDown={closeModal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showInputModal}
        onRequestClose={() => {
          setShowInputModal(false);
        }}>
        <Container>
          <StyledView>
            <ModalContent>
              <TopHeaderView>
                <BackTouchable onPress={closeModal}>
                  <Icon
                    name={'chevron-down-outline'}
                    size={30}
                    color={'#246EE9'}
                  />
                </BackTouchable>
              </TopHeaderView>
              <MainContent>
                <ModalTitleView>
                  <TitleText>
                    {exerciseValues.name
                      ? 'Edit Exercise'
                      : 'Create new exercise'}
                  </TitleText>
                </ModalTitleView>
              </MainContent>
            </ModalContent>
          </StyledView>
        </Container>
      </Modal>
    </GestureRecognizer>
  );
};
