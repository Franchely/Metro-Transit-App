import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Form from '../components/Form'
import DirectionInput from '../components/DirectionInput';
import {routes, directions21, stops1, departuresFINN} from './mockData'

test('renders app', async () => {
  render(<App />);
  const title = await screen.findByText('Search By Route');
  expect(title).toBeInTheDocument();
});

it('should correctly set default option', async () => {
    render(<Form routeOptions={routes}/>)
    const defaultOption = await screen.findByRole('option', {name: 'Select Route...'})
    expect(defaultOption.selected).toBe(true)
  })

test('can select route option from dropdown', async () => {
    render(<Form routeOptions={routes} />)
    const select1 = await screen.findByTestId('select-route')
    const option1 = await screen.findByRole('option', {name: 'Route 21'})
    userEvent.selectOptions(select1, option1)
    expect(option1.selected).toBe(true)

    // const select2 = await screen.findByTestId('select-direction')
    // const option2 = await screen.findByRole('option', {name: 'Eastbound'})
    // userEvent.selectOptions(select2, option2)
    // expect(option2.selected).toBe(true)

    // const select3 = await screen.findByTestId('select-stop')
    // const option3 = await screen.findByRole('option', {name: 'Uptown Transit Station'})
    // userEvent.selectOptions(select3, option3)
    // expect(option3.selected).toBe(true)

    // const button = await screen.findByTestId('submit-button')
    // expect(button).toBeInTheDocument();
})

test('can select direction option from dropdown', async () => {
  render(
    <Form routeOptions={routes}>
      <DirectionInput selectedRoute={'21'} directionOptions={directions21}/>
    </Form>
  )
  const select1 = await screen.findAllByTestId('select-direction')
  const option1 = await screen.findByRole('option', {name: 'Westbound'})
  userEvent.selectOptions(select1, option1)
  expect(option1.selected).toBe(true)

})
