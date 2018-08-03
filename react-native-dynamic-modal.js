/**
 * react-native-dynamic-modal.js
 *
 * A bunch of complicated code that just adds a props function
 * to open up any arbitray modal without worrying about booleans
 */

import React from 'react'
import { View } from 'react-native'
import hoistNonReactStatic from 'hoist-non-react-statics';

// TODO: Make this a map? 
const modalRegistry = {}

// This is a decorator
// It returns a function that returns the passedi in component
// after adding it to the component stack.
export const registerModal = (name) => (Component) => {
    if(!name || typeof name !== 'string')
        throw `Modal must be registered with a string name but got ${typeof name}`
    if(modalRegistry[name]){
        throw `Modal with name ${name} already registered'`
    }
    modalRegistry[name] = { Component }
    return Component
}

// TODO: Handle back button press ca
export const withModal = (Component) => {
    class ComponentWithModal extends React.Component {
        static displayName = `withModal(${Component.displayName || Component.name})`

        state = {
            modalStack : [],
        }

        // Simply adds a modal to the modal stack
        openModal = (name, data, onClose) => {
            let modalData
            // modal name not found (case sensitive)
            if(!(modalData = modalRegistry[name]))
                throw `Modal ${name} not one of registered modals: ${Object.keys(modalRegistry)}`
            let {Component} = modalData
            this.setState({
                modalStack : [...this.state.modalStack, { Component, data, onClose }]
            })
        }

        _removeModal = (modal) => {
            let {modalStack} = this.state
            if(modal.onClose){
                // Determine if modal should be closed
                let result = modal.onClose()
                if(!result)
                    return
            }
            this.setState({modalStack: modalStack.filter( m => m != modal )})
        }

        _getModals(){
            return this.state.modalStack.map((modal, index)=>{
                let {Component, data, onClose} = modal
                return <Component 
                    key={index} 
                    requestClose={ () => {
                        this._removeModal(modal)
                    }}
                    {...data} />
            })
        }

        render() {
            return (
                <View style={{flex:1, backgroundColor:'transparent'}}>
                    <Component {...this.props} openModal={this.openModal}/>
                    {this._getModals()}
                </View>
            )
        }
    }
    return hoistNonReactStatic(ComponentWithModal, Component)
}