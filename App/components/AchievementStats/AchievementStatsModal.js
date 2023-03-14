import React from 'react';
import {Modal, Text} from 'react-native';

import {
  Container,
  ModalContent,
  ProgressBarView,
  Stat,
  StatLabel,
  StatsView,
  StyledText,
} from './AchievementStatsModal.styles';

import ProgressBar from 'react-native-progress/Bar';
import {COLORS} from '../../assets/appColors/Colors';

export const AchievementStatsModal = ({
  achievementStatsRef,
  showStatsModal,
  setShowStatsModal,
}) => {
  const achievementStats = achievementStatsRef.current;
  const totalAchievements =
    achievementStatsRef.current.totalUnlocked +
    achievementStatsRef.current.totalLocked;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showStatsModal}
      onRequestClose={() => {
        setShowStatsModal(false);
      }}>
      <Container activeOpacity={1} onPress={() => setShowStatsModal(false)}>
        <ModalContent>
          <ProgressBarView>
            <StyledText>
              {achievementStats.totalUnlocked} / {totalAchievements}
            </StyledText>
            <ProgressBar
              progress={achievementStats.progressBarNum}
              width={250}
              height={10}
              color={COLORS.purple}
              unfilledColor={COLORS.input}
              borderWidth={0}
            />
          </ProgressBarView>
          <StatsView>
            <StatLabel>
              Total points: <Stat> {achievementStats.totalPoints}</Stat>
            </StatLabel>
            <StatLabel>
              Unlocked achievements:{' '}
              <Stat> {achievementStats.totalUnlocked}</Stat>
            </StatLabel>
            <StatLabel>
              Locked achievements: <Stat> {achievementStats.totalLocked}</Stat>
            </StatLabel>
            <StatLabel>
              Total sets: <Stat> {achievementStats.totalSets}</Stat>
            </StatLabel>
          </StatsView>
        </ModalContent>
      </Container>
    </Modal>
  );
};
