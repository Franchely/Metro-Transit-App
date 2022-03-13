import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Form from '../components/Form'
import DirectionInput from '../components/DirectionInput';
import StopsInput from '../components/StopsInput';
import DeparturesTable from '../components/DeparturesTable';
import {routes, directions21, stops1, departuresFINN} from './mockData'


test('renders app', async () => {
  render(<App />);
  const title = await screen.findByText('Search By Route');
  expect(title).toBeInTheDocument();
});

test('should correctly set default option', async () => {
    render(<Form routeOptions={routes}/>)
    const defaultOption = await screen.findByRole('option', {name: 'Select Route...'})
    expect(defaultOption.selected).toBe(true)
  })

test('can select route option from dropdown', async () => {
    render(<Form routeOptions={routes} />)
    const select = await screen.findByTestId('select-route')
    const option = await screen.findByRole('option', {name: 'Route 21'})
    userEvent.selectOptions(select, option)
})

test('can select direction option from dropdown', async () => {
  render(
    <Form routeOptions={routes}>
      <DirectionInput selectedRoute={'21'} directionOptions={directions21}/>
    </Form>
  )

  // Select route
  const select1 = await screen.findByTestId('select-route')
  const option1 = await screen.findByRole('option', {name: 'Route 21'})
  userEvent.selectOptions(select1, option1)

  // select direction
  const select = await screen.findByTestId('select-direction')
  const option = await screen.findByRole('option', {name: 'Westbound'})
  userEvent.selectOptions(select, option)
  expect(option.selected).toBe(true)

})

test('can select stop option from dropdown', async () => {
  render(
    <Form routeOptions={routes}>
      <DirectionInput selectedRoute={'21'} directionOptions={directions21}>
        <StopsInput 
          selectedDirection={'1'} 
          stopOptions={stops1}
          selectedRoute={'21'}>

        </StopsInput>
      </DirectionInput>
    </Form>, {wrapper: MemoryRouter}
  )

  // Select route
  const select1 = await screen.findByTestId('select-route')
  const option1 = await screen.findByRole('option', {name: 'Route 21'})
  userEvent.selectOptions(select1, option1)

  // select direction
  const select2 = await screen.findByTestId('select-direction')
  const option2 = await screen.findByRole('option', {name: 'Westbound'})
  userEvent.selectOptions(select2, option2)

  // select stop
  const select3 = await screen.findByTestId('select-stop')
  const option3 = await screen.findByRole('option', {name: 'Summit Ave and Finn St'})
  userEvent.selectOptions(select3, option3)
  expect(option3.selected).toBe(true)

})

test('submit button renders once all options are selected', async () => {
  render(
    <Form routeOptions={routes}>
      <DirectionInput selectedRoute={'21'} directionOptions={directions21}>
        <StopsInput 
          selectedDirection={'1'} 
          stopOptions={stops1}
          selectedRoute={'21'}>

        </StopsInput>
      </DirectionInput>
    </Form>, {wrapper: MemoryRouter}
  )

  // Select route
  const select1 = await screen.findByTestId('select-route')
  const option1 = await screen.findByRole('option', {name: 'Route 21'})
  userEvent.selectOptions(select1, option1)

  // select direction
  const select2 = await screen.findByTestId('select-direction')
  const option2 = await screen.findByRole('option', {name: 'Westbound'})
  userEvent.selectOptions(select2, option2)

  // select stop
  const select3 = await screen.findByTestId('select-stop')
  const option3 = await screen.findByRole('option', {name: 'Summit Ave and Finn St'})
  userEvent.selectOptions(select3, option3)

  const submitButton = await screen.findByTestId('submit-button')
  expect(submitButton).toBeInTheDocument();
})

test('renders departures table', async () => {
  render(<DeparturesTable departures={departuresFINN} />)
  const table = await screen.findByTestId('route-info-table')
  expect(table).toBeInTheDocument();
})

test('renders departures data', async () => {
  render(<DeparturesTable departures={departuresFINN} />)
  const departures = await screen.findAllByTestId('departure')
  departures.forEach(departure => {
    expect(departure).toBeInTheDocument();
  })
})

test('renders error message if no departures', async () => {
  render(<DeparturesTable departures={[]} />)
  const message = await screen.findByText('No upcoming departures found.')
  expect(message).toBeInTheDocument();
})