import { h } from 'preact';
import Header from '../src/components/list';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of the List', () => {
    test('Header renders 3 nav items', () => {
        const context = shallow(<Header tree={{children: [], text: "Heading", type: "heading"}} />);
        expect(context.find('input').text()).toBe('Preact App');
        expect(context.find('Link').length).toBe(3);
    });
});
