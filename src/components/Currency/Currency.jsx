import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function Currency() {
    const isDesktopOrTablet = useMediaQuery({ minWidth: 1280 });
    const [currency, setCurrency] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetch = async () => {
      try {
        const data = await fetchInfo();
        const sliced = data.slice(0, -1);
        setCurrency([...sliced]);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetch();
    }, []);
  
    return (
      <>
        <div>
          <TableContainer>
            {!isLoading ? (
              <Skeleton
                style={{
                  background:
                    'linear-gradient(to right,  rgba(49, 45, 45, 0.8), rgba(49, 45, 45, 0.2), rgba(49, 45, 45, 0.8))',
                }}
                duration={3}
                width={isDesktopOrTablet ? 357 : 280}
                height={174}
              />
            ) : (
              <Table size="small" aria-label="a dense table">
                <TableHead >
                  <TableRow>
                    <TableCell color="secondary" >
                      Currency
                    </TableCell>
                    <TableCell align="center" >
                      Buy
                    </TableCell>
                    <TableCell align="center" >
                      Sale
                    </TableCell>
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {currency?.map(el => (
                    <TableRow key={el.ccy}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {el.ccy}
                      </TableCell>
                      <TableCell align="center">
                        {Math.floor(el.buy * 100) / 100}
                      </TableCell>
                      <TableCell align="center">
                        {Math.floor(el.sale * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>
      </>
    );
  }
  
  export default Currency;