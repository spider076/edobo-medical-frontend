export default function Popover() {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            opacity: '0!important'
          }
        }
      }
    }
  };
}
