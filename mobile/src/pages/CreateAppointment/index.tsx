import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import { Provider } from '../Dashboard/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { goBack } = useNavigation();

  const { user } = useAuth();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Feather name='chevron-left' size={24} color='#999591' />
        </BackButton>

        <HeaderTitle>Profissionais</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          data={providers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(item.id)}
              selected={item.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: item.avatar_url }} />
              <ProviderName selected={item.id === providerId}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode='date'
            onChange={handleDateChange}
            display='calendar'
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
