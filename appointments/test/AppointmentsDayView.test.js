import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Appointment,
  AppointmentsDayView,
} from '../src/AppointmentsDayView';

describe('Appointment', () => {
  let container;
  let customer;

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jordan');
  });
});

describe('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {
        firstName: 'Ashley',
        lastName: 'Pérez',
        phoneNumber: '92839213',
        stylist: 'Sandra',
        notes: 'Example notes 1',
      },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {
        firstName: 'Jordan',
        lastName: 'Díaz',
        phoneNumber: '2914321',
        stylist: 'Peter',
        notes: 'Example notes 2',
      },
    },
  ];
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      container.querySelector('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00');
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(
      2
    );
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('Jordan');
  });

  it('renders a table for the appointment selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const table = container.querySelector('table');

    expect(table).not.toBeNull();
  });

  it('renders the data of the appointments customer', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const table = container.querySelector('table');

    expect(table.textContent).toMatch('Pérez');
    expect(table.textContent).toMatch('92839213');
    expect(table.textContent).toMatch('Sandra');
    expect(table.textContent).toMatch('Example notes 1');
  });
    it('renders a title with the Appointment that is being viewed (time)', () => {
      render(<AppointmentsDayView appointments={appointments} />);
      const heading = container.querySelector('h1');
      
      expect(heading).not.toBeNull();
      expect(heading.textContent).toMatch('Today\'s appointment at 12:00');
    });
});
