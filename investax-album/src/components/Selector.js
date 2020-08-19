import React from 'react'
import { useSelect } from 'downshift'
import SVGIcon from './SVGIcon'

function Selector ({ defaultValue, placeholder, options: items, onChange }) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items,
    initialSelectedItem: defaultValue,
    onSelectedItemChange: (changes) => onChange(changes.selectedItem)
  })

  return (
    <div className='dropdown'>
      <div className='dropdown__trigger'>
        <button {...getToggleButtonProps()} className='button'>
          <span className='button__text'>{selectedItem || placeholder}</span>
          <SVGIcon name='arrow-down-angle' size={11} />
        </button>
      </div>
      {/* FIX: next line causes a warning in the console  */}
      {isOpen &&
        <ul {...getMenuProps()} className='dropdown__menu'>
          {
            items.map((item, index) => (
              <li
                {...getItemProps({ item, index })}
                key={`${item}${index}`}
                style={
                  highlightedIndex === index ? { backgroundColor: '#333', color: '#fff' } : {}
                }
              >
                {item}
              </li>
            ))
          }
        </ul>}
    </div>
  )
}

export default Selector
