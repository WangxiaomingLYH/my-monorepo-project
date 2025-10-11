import { type ComponentInstance } from 'vue';
import { ElPagination } from 'element-plus';
export type ElPaginationInstance = Partial<ComponentInstance<typeof ElPagination>>

export type ElPaginationProps = {
    pagination: Function;
    options?: ElPaginationInstance
}