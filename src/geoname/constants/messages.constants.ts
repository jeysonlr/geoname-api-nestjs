export const ERROR_MESSAGES = {

    STATE_DATABASE_ERROR: 'Ocorreu um erro ao consultar o(s) estado(s) "{}"!',
    ACRONYM_DATABASE_ERROR: 'Ocorreu um erro ao consultar a sigla "{}"!',
    ACRONYM_CONFLICT_EXISTS: 'Já existe um estado cadastrado com esta sigla "{}"!',
    STATE_CONFLICT_EXISTS: 'Já existe um estado cadastrado com este nome "{}"!',
    STATE_SAVE_DATABASE_ERROR: 'Ocorreu um erro ao salvar o estado!',
    STATE_UPDATE_DATABASE_ERROR: 'Ocorreu um  erro ao atualizar o estado!',
    STATE_CREATE_ERROR: 'Ocorreu um erro ao criar estado "{}"!',
    STATE_UPDATE_ERROR: 'Ocorreu um erro ao atualizar estado "{}"!',
    STATE_FIND_ALL_ERROR_OCURRED: 'Ocorreu um erro ao buscar todos estados!',
    STATE_NOT_FOUND: 'Estado nao encontrado!',
    STATE_FIND_BY_ID_NOT_FOUND: 'Estado com id "{}" não encontrado!',
    STATE_FIND_BY_NAME_NOT_FOUND: 'O estado com nome "{}" não foi encontrado!',
    STATE_FIND_BY_ACRONYM_NOT_FOUND: 'O estado com a sigla "{}"não foi encontrado!',
};

export const SUCCESS_MESSAGES = {
    GET_SUCCESS: 'Resposta retornada com sucesso!',
    CREATE_STATE_SUCCESS: 'Estado cadastrado com sucesso!',
    UPDATE_STATE_SUCCESS: 'Estado atualizado com sucesso!',
};
