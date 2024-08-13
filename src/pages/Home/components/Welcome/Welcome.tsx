import { TheeDModelLoader } from '@/components/shared/TheeDModelLoader';
import { Panel, StyledPlanetWrapper, StyledWrapper } from './styles';

const Welcome = () => {
  return (
    <StyledWrapper>
      <Panel>Sky puzzle</Panel>
      <StyledPlanetWrapper>
        <TheeDModelLoader url="earth.glb" />
      </StyledPlanetWrapper>
    </StyledWrapper>
  );
};

export default Welcome;
