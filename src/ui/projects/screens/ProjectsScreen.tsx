import React from 'react';
import { Text, View } from 'react-native';
import { ProjectsScreenRouteParams } from 'ui/main/navigation/AppStackNavigator';

type Props = {
  route: ProjectsScreenRouteParams;
};

const ProjectsScreen: React.FunctionComponent<Props> = ({ route }) => {
  return (
    <>
      <View>
        <Text>Project Page</Text>
      </View>
    </>
  );
};

export default ProjectsScreen;
