import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface RouteParams {
  date: number;
}

const Appointment: React.FC = () => {
  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const { reset } = useNavigation();

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h.'",
      { locale: ptBR }
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Feather name='check' size={80} color='#04d361' />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default Appointment;
