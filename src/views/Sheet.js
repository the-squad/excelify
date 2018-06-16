import React from 'react';
import styled from 'styled-components';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex, Box } from 'grid-styled';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import { getPureTable } from '../utils/GenerateTable';
import { updateCell } from '../store/actions/sheets';

import Button from '../components/buttons/Button';
import Text from '../components/text/Text';
import { STATES } from '../components/renderer/Renderer';
import EmptyState from '../components/emptyState/EmptyState';
import Spinner from '../components/spinner/Spinner';

import { COLORS, COLORS_VALUES } from '../base/Colors';
import { FONT_TYPES } from '../base/Typography';
import Space from '../base/Space';

const FullHeight = styled(Flex)`
  height: 92vh;
`;

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
  sheets: Map,
  sheetsState: Object,
  updateCell: Function,
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
    const sheet = sheets.get(activeSheet);
    const worksheet = XLSX.utils.aoa_to_sheet(getPureTable(sheet.sheet));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    XLSX.writeFile(workbook, `${sheet.name}.xlsx`);
  };

  render() {
    const { sheets, sheetsState } = this.props;
    const { activeSheet } = this.state;
    const currentSheet = sheets.get(activeSheet);

    return (
      <React.Fragment>
        {sheetsState.fold({
          [STATES.LOADING]: () => (
            <FullHeight alignItems="center" justifyContent="center" width={1}>
              <Spinner />
            </FullHeight>
          ),
          [STATES.EMPTY]: () => (
            <FullHeight alignItems="center" justifyContent="center" width={1}>
              <EmptyState icon="excel" text="You don't have any image uploaded" />
            </FullHeight>
          ),
          [STATES.SUCCESS]: () => (
            <PageContainer>
              <HistoryContainer flexDirection="column">
                <HeaderContainer>
                  <Flex flexDirection="column">
                    <Text type={FONT_TYPES.HEADING}>Uploaded Images</Text>
                    <Text color={COLORS.DISABLED} type={FONT_TYPES.CAPTION}>
                      {sheets.size} images
                    </Text>
                  </Flex>
                </HeaderContainer>
                <HistoryGrid flexDirection="column" width="238px">
                  {Array.from(sheets.values()).map((sheet, index) => (
                    <ImagePreview onClick={() => this.onSelect(index)} src={sheet.image} />
                  ))}
                </HistoryGrid>
              </HistoryContainer>

              <Flex flexDirection="column" width={1}>
                <HeaderContainer justifyContent="space-between">
                  <Flex flexDirection="column">
                    <Text type={FONT_TYPES.HEADING}>{sheets.get(activeSheet).name}</Text>
                    <Text color={COLORS.DISABLED} type={FONT_TYPES.CAPTION}>
                      {sheets.get(activeSheet).date}
                    </Text>
                  </Flex>
                  <Button onClick={this.onExport} primary={false}>
                    Export as .xlsx
                  </Button>
                </HeaderContainer>
                <ReactDataSheet
                  data={currentSheet.sheet}
                  valueRenderer={cell => cell.value}
                  onCellsChanged={changes => this.props.updateCell(changes, activeSheet)}
                />
              </Flex>
            </PageContainer>
          ),
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  sheets: store.sheets.sheets,
  sheetsState: store.sheets.sheetsState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCell,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sheet);
