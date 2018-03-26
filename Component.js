import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import Camera from '../src/components/camera';

describe('Common components', function () {
    describe('<Button />', function () {
        it('renders correctly', function () {
            const tree = renderer.create(<Camera />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

});