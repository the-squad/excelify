import React from 'react';
import styled from 'styled-components';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import { getPureTable } from '../utils/generateTable';

import Button from '../components/buttons/Button';
import Text from '../components/text/Text';

import { COLORS, COLORS_VALUES } from '../base/Colors';
import { FONT_TYPES } from '../base/Typography';
import Space from '../base/Space';

const PageContainer = styled(Flex)`
  min-height: 95vh;
  max-height: max-content;
`;

const HistoryContainer = styled(Flex)`
  border-right: 2px solid ${COLORS_VALUES[COLORS.BORDER]};
`;

const HistoryGrid = styled(Box)`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 6px;
  grid-auto-rows: auto;
  grid-row-gap: 6px;
  padding: ${Space[4]}px;
`;

const HeaderContainer = styled(Flex)`
  padding: ${Space[2]}px ${Space[3]}px;
  border-bottom: 2px solid ${COLORS_VALUES[COLORS.BORDER]};
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 2px;
  cursor: pointer;
`;

type Props = {
  sheets: Array<Array<Object>>,
};

type State = {
  activeSheet: number,
};

class Sheet extends React.Component<Props, State> {
  state = {
    activeSheet: 0,
  };

  onSelect = (index: number) => {
    this.setState({
      activeSheet: index,
    });
  };

  onExport = () => {
    const { activeSheet } = this.state;
    const { sheets } = this.props;
    const sheet = sheets[activeSheet];
    const table = getPureTable(sheet.sheet);
    const worksheet = XLSX.utils.aoa_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    XLSX.writeFile(workbook, `${sheet.name}.xlsx`);
  };

  render() {
    const { sheets } = this.props;
    const { activeSheet } = this.state;

    return (
      <PageContainer>
        <HistoryContainer flexDirection="column">
          <HeaderContainer>
            <Flex flexDirection="column">
              <Text type={FONT_TYPES.HEADING}>Uploaded Images</Text>
              <Text color={COLORS.DISABLED} type={FONT_TYPES.CAPTION}>
                {sheets.length} images
              </Text>
            </Flex>
          </HeaderContainer>
          <HistoryGrid flexDirection="column">
            {sheets.map((sheet, index) => (
              <ImagePreview onClick={() => this.onSelect(index)} src={sheet.image} />
            ))}
          </HistoryGrid>
        </HistoryContainer>

        <Flex flexDirection="column" width={1}>
          <HeaderContainer justifyContent="space-between">
            <Flex flexDirection="column">
              <Text type={FONT_TYPES.HEADING}>{sheets[activeSheet].name}</Text>
              <Text color={COLORS.DISABLED} type={FONT_TYPES.CAPTION}>
                {sheets[activeSheet].date}
              </Text>
            </Flex>
            <Button onClick={this.onExport} primary={false}>
              Export as .xlsx
            </Button>
          </HeaderContainer>
          <ReactDataSheet
            data={this.props.sheets[activeSheet].sheet}
            valueRenderer={cell => cell.value}
          />
        </Flex>
      </PageContainer>
    );
  }
}

const mapStateToProps = store => ({
  sheets: store.sheets.sheets,
});

export default connect(mapStateToProps)(Sheet);
