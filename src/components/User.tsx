import React from 'react'

interface State {
    name: string ;
}

interface Props {
    children: React.ReactNode;
    hiChange: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default class User extends React.Component<Props, State> {
    
    state: State = {
        name: '',
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const key = e.currentTarget.name;
        const name = e.currentTarget.value;
        if (Object.keys(this.state).includes(key)) {
            this.setState({ [key]: name } as Pick<State, keyof State>);
        }

    }

    render() {
        return(
            <>
                <p>Print your name:</p>
                <input autoFocus type="text" name="name" id="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                <p>Your name is: {this.state.name}</p>
                {this.props.children}
                <button onClick={this.props.hiChange}>Change on random greetings</button>
            </>
        )
    }

}