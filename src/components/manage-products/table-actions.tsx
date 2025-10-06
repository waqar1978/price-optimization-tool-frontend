import {Button, Stack} from "@mui/material";

export const TableActions = () => {
  return (
      <Stack width={'100%'} p={2} alignItems={'end'}>
          <Stack direction={'row'} spacing={2}>
              <Button
                  variant={'outlined'}
                  sx={{
                      color: "white",
                      textTransform: "none",
                  }}
              >
                  Cancel
              </Button>
              <Button
                  variant={'contained'}
                  sx={{
                      color: "white",
                      textTransform: "none",
                  }}
              >
                  Save
              </Button>
          </Stack>
      </Stack>
  )
}