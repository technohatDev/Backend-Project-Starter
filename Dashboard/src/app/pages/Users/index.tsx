import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import RecordsList from '../../components/GenericCRUD/RecordsList'
import {useDispatch, useSelector} from 'react-redux'

// Utils
import {Roles} from '../../utils/constants.util'

// Actions
import {
  setTableData,
  setTableColumns,
  setTableName,
  setIsTableHasFiles,
  setIsOperationDone,
  setOperationsPermissions,
  setTotalRecords,
} from '../../store/actions'

// Data
import {columns} from './data.users'

// API
import genericCrudAPI from '../../api/generic-crud.api'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {excludeColumns} from '../../utils/constants.util'

const Users = () => {
  const dispatch = useDispatch()
  const {isOperationDone} = useSelector((state: IState) => state.crudReducer)
  const [searchParams] = useSearchParams()

  const [params, setParams] = useState<any>({})
  const [isParamsChanged, setIsParamsChanged] = useState<boolean>(false)

  const getSearchParams = () => {
    const filterFields = columns.filter(
      (field) => !excludeColumns.includes(field.attr) && field.type !== 'image'
    )

    // get filters from search params if exist
    const searchParamsObj: any = {}

    if (searchParams.get('page')) {
      searchParamsObj['page'] = searchParams.get('page')
    }

    if (searchParams.get('search')) {
      searchParamsObj['search'] = searchParams.get('search')
    }

    filterFields.forEach((field) => {
      if (searchParams.get(field.attr)) {
        searchParamsObj[field.attr] = searchParams.get(field.attr)
      }
    })
    setParams(searchParamsObj)
    setIsParamsChanged(true)
  }

  const fetchData = async () => {
    const response = await genericCrudAPI('users').getAll(params)
    const rolesResponse = await genericCrudAPI('roles').getAll()

    const roles = rolesResponse.data.map((role: any) => ({
      value: role.id,
      label: role.name,
    }))

    const newColumns = columns.map((column) => {
      if (column.attr === 'roleId') {
        return {
          ...column,
          options: roles,
        }
      }

      return column
    })

    dispatch(setTableData(response.data))
    dispatch(setTotalRecords(response.totalRecords))
    dispatch(setTableColumns(newColumns))
    dispatch(setTableName('users'))
    dispatch(setIsTableHasFiles(true))
    dispatch(setIsOperationDone(false))
    dispatch(setOperationsPermissions(Roles.ALLOW_USERS_OPERATION))
  }

  useEffect(() => {
    getSearchParams()
  }, [])

  useEffect(() => {
    if (!isParamsChanged) return

    fetchData()
  }, [isOperationDone, isParamsChanged])

  return (
    <div>
      <RecordsList />
    </div>
  )
}

export default Users
